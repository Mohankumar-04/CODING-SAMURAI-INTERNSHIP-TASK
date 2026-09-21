package com.library.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.library.dto.MemberDTO;
import com.library.entity.Member;
import com.library.entity.MemberStatus;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.MemberRepository;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<MemberDTO> getAllMembers() {
        return memberRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public MemberDTO getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));
        return toDTO(member);
    }

    public MemberDTO registerMember(MemberDTO dto) {
        if (memberRepository.existsByEmail(dto.email())) {
            throw new IllegalStateException("A member with email " + dto.email() + " already exists.");
        }

        Member member = new Member();
        // Generate a membership number: LIB-XXXXXX
        String membershipNumber = "LIB-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        member.setMembershipNumber(membershipNumber);
        member.setName(dto.name());
        member.setEmail(dto.email());
        member.setPhone(dto.phone());
        member.setStatus(dto.status() != null ? dto.status() : MemberStatus.ACTIVE);

        Member savedMember = memberRepository.save(member);
        return toDTO(savedMember);
    }

    public MemberDTO updateMember(Long id, MemberDTO dto) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with ID: " + id));

        member.setName(dto.name());
        member.setPhone(dto.phone());
        if (dto.status() != null) {
            member.setStatus(dto.status());
        }

        Member updatedMember = memberRepository.save(member);
        return toDTO(updatedMember);
    }

    public void deleteMember(Long id) {
        if (!memberRepository.existsById(id)) {
            throw new ResourceNotFoundException("Member not found with ID: " + id);
        }
        memberRepository.deleteById(id);
    }

    private MemberDTO toDTO(Member member) {
        return new MemberDTO(
                member.getId(),
                member.getMembershipNumber(),
                member.getName(),
                member.getEmail(),
                member.getPhone(),
                member.getStatus()
        );
    }
}