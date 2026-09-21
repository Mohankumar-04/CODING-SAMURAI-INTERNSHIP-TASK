package com.library.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.library.dto.BookDTO;
import com.library.entity.Book;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.BookRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;

    // Explicit constructor injection (no Lombok needed)
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + id));
        return toDTO(book);
    }

    public BookDTO addBook(BookDTO dto) {
        if (bookRepository.existsByIsbn(dto.isbn())) {
            throw new IllegalStateException("A book with ISBN " + dto.isbn() + " already exists.");
        }

        Book book = new Book();
        book.setIsbn(dto.isbn());
        book.setTitle(dto.title());
        book.setAuthor(dto.author());
        book.setGenre(dto.genre());
        book.setTotalCopies(dto.totalCopies());
        book.setAvailableCopies(dto.availableCopies() != null ? dto.availableCopies() : dto.totalCopies());

        Book savedBook = bookRepository.save(book);
        return toDTO(savedBook);
    }

    public BookDTO updateBook(Long id, BookDTO dto) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + id));

        book.setTitle(dto.title());
        book.setAuthor(dto.author());
        book.setGenre(dto.genre());
        book.setTotalCopies(dto.totalCopies());
        if (dto.availableCopies() != null) {
            book.setAvailableCopies(dto.availableCopies());
        }

        Book updatedBook = bookRepository.save(book);
        return toDTO(updatedBook);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResourceNotFoundException("Book not found with ID: " + id);
        }
        bookRepository.deleteById(id);
    }

    private BookDTO toDTO(Book book) {
        return new BookDTO(
                book.getId(),
                book.getIsbn(),
                book.getTitle(),
                book.getAuthor(),
                book.getGenre(),
                book.getTotalCopies(),
                book.getAvailableCopies()
        );
    }
}