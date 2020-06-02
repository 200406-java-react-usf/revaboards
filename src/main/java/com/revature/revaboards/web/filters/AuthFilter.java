package com.revature.revaboards.web.filters;

import com.revature.revaboards.entities.UserRole;
import com.revature.revaboards.web.dtos.Principal;
import com.revature.revaboards.web.security.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@WebFilter("/*")
public class AuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse resp, FilterChain chain) throws ServletException, IOException {

        parseToken(req);
        System.out.println("made it here<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        chain.doFilter(req, resp);

    }

    private void parseToken(HttpServletRequest req) {

        try {

            String header = req.getHeader(JwtConfig.HEADER);

            if (header == null || !header.startsWith(JwtConfig.PREFIX)) {
                System.out.println("Unauthenticated request");
                return;
            }

            String token = header.replaceAll(JwtConfig.PREFIX, "");

            Claims claims = Jwts.parser()
                    .setSigningKey(JwtConfig.SECRET.getBytes())
                    .parseClaimsJws(token)
                    .getBody();

            int id = Integer.parseInt(claims.getId());
            String username = claims.getSubject();
            UserRole role = UserRole.getByName(claims.get("role", String.class));
            Principal principal = new Principal(id, username, role);
            req.setAttribute("principal", principal);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
