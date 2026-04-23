package com.example.demo.controller;

import com.example.demo.dto.TeamClassDto;
import com.example.demo.dto.TeamMemberDto;
import com.example.demo.service.TeamService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/team")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/classes")
    public List<TeamClassDto> classes() {
        return teamService.listClasses();
    }

    @GetMapping("/members")
    public List<TeamMemberDto> members() {
        return teamService.listMembers();
    }
}
