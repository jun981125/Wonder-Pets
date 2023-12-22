package com.example.spring.dto;

import com.example.spring.entity.BoardEntity;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BoardDto {

    private int boardno;
    private String boardtitle;
    private String boardcontent;
    private int boardcnt;
    private String boardfilename;
    private String boardfilepath;
    private Timestamp created;
    private String userid;
    private String updated;

    public static BoardDto toBoardDto(BoardEntity boardEntity) {
        BoardDto boardDto = new BoardDto();
        boardDto.setBoardno(boardEntity.getBoardno());
        boardDto.setBoardtitle(boardEntity.getBoardtitle());
        boardDto.setBoardcontent(boardEntity.getBoardcontent());
        boardDto.setBoardcnt(boardEntity.getBoardcnt());
        boardDto.setBoardfilename(boardEntity.getBoardfilename());
        boardDto.setBoardfilepath(boardEntity.getBoardfilepath());
        boardDto.setCreated(boardEntity.getCreated());
        boardDto.setUserid(boardEntity.getUserid());
        return boardDto;
    }
}