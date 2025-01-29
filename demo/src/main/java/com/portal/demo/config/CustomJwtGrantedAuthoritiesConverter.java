package com.portal.demo.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Convertisseur de rôles à partir du JWT.
 */
public class CustomJwtGrantedAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    private final String clientName;

    public CustomJwtGrantedAuthoritiesConverter(String clientName) {
        this.clientName = clientName;
    }

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        // Récupérer les rôles depuis les claims du JWT
        List<String> roles = (List<String>) jwt.getClaims().get("realm_access").get("roles");

        if (roles != null) {
            for (String role : roles) {
                // Ajouter chaque rôle en tant qu'autorité
                authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
            }
        }

        // Retourner les autorités extraites du JWT
        return authorities;
    }
}

