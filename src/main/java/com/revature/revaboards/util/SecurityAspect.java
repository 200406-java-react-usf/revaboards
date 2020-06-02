package com.revature.revaboards.util;

import com.revature.revaboards.exceptions.AuthenticationException;
import com.revature.revaboards.exceptions.AuthorizationException;
import com.revature.revaboards.web.dtos.Principal;
import com.revature.revaboards.web.security.Secured;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

@Aspect
@Component
public class SecurityAspect {

    @Around("@annotation(com.revature.revaboards.web.security.Secured)")
    public Object secureEndpoint(ProceedingJoinPoint pjp) throws Throwable {

        Method method = ((MethodSignature) pjp.getSignature()).getMethod();
        Secured ctrlrAnnotation = method.getAnnotation(Secured.class);

        List<String> allowedRoles = Arrays.asList(ctrlrAnnotation.allowedRoles());
        HttpServletRequest req = (HttpServletRequest) pjp.getArgs()[0];
        Principal principal = (Principal) req.getAttribute("principal");

        if (principal == null) {
            throw new AuthorizationException("An unauthenticated request was made to a protected endpoint.");
        }

        if (!allowedRoles.contains(principal.getRole().toString())) {
            throw new AuthorizationException("A forbidden request was made by " + principal.getUsername());
        }

        return pjp.proceed();

    }
}
