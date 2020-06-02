package com.revature.revaboards.util;

import com.revature.revaboards.exceptions.BadRequestException;
import com.revature.revaboards.exceptions.ResourceNotFoundException;
import com.revature.revaboards.exceptions.RevaboardsException;
import com.revature.revaboards.web.dtos.ErrorResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;

@Component
@RestControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler
    public ErrorResponse handleRevaboardsException(RevaboardsException e, HttpServletResponse resp) {
        ErrorResponse err = new ErrorResponse(e);

        if (e instanceof ResourceNotFoundException) {
            resp.setStatus(404);
        } else if (e instanceof BadRequestException) {
            resp.setStatus(400);
        }

        return err;
    }

}
