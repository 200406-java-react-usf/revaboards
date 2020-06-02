package com.revature.revaboards.web.security;

import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;

public class JwtConfig {

    public static final String HEADER = "Authorization";
    public static final String PREFIX = "Bearer ";
    public static final String SECRET = "revature";
    public static final int EXPIRATION = 24 * 60 * 60 * 1000;
    public static final SignatureAlgorithm SIG_ALG = SignatureAlgorithm.HS512;
    public static final Key SIGNING_KEY;

    static {
        byte[] secretBytes = DatatypeConverter.parseBase64Binary(SECRET);
        SIGNING_KEY = new SecretKeySpec(secretBytes, SIG_ALG.getJcaName());
    }

    private JwtConfig() {
        super();
    }

}
