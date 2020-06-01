package com.revature.revaboards.util;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    @Pointcut("within(com.revature.revaboards..*)")
    public void logAll(){}

    @Before("logAll()")
    public void logMethodStart(JoinPoint jp) {
        String methodSig = jp.getTarget().getClass().toString() + "." + jp.getSignature().getName();
        System.out.printf("%s invoked at %s \n", methodSig, LocalTime.now());
        System.out.printf("Input arguments: %s\n", Arrays.toString(jp.getArgs()));
    }

}
