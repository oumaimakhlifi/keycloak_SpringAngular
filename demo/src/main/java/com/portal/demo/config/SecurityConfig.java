@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2ResourceServer()
                .jwt()
                .issuerUri("http://localhost:8080/realms/Customer") // Remplacez cette URL par celle de votre serveur OAuth2
            .and()
            .authorizeRequests()
                .antMatchers("/api/v1/admin").hasAuthority("ROLE_ADMIN")
                .anyRequest().authenticated();
    }
}

