//package com.backend.rssparser;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
//import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        return  http
//                .authorizeHttpRequests((requests) -> requests
//                        .requestMatchers("/rss-reader/**").permitAll()
//                        .anyRequest().permitAll()
//                )
//                .csrf(new Customizer<CsrfConfigurer<HttpSecurity>>() {
//                    @Override
//                    public void customize(CsrfConfigurer<HttpSecurity> httpSecurityCsrfConfigurer) {
//                        httpSecurityCsrfConfigurer.disable();
//                    }
//                })
//                .formLogin(new Customizer<FormLoginConfigurer<HttpSecurity>>(){
//                    @Override
//                    public void customize(FormLoginConfigurer<HttpSecurity> httpSecurityFormLoginConfigurer) {
//                        httpSecurityFormLoginConfigurer.disable();
//                    }
//                })
//                .build();
//    }
//
////    @Bean
////    public UserDetailsService userDetailsService() {
////        UserDetails user =
////                User.withDefaultPasswordEncoder()
////                        .username("kina0630")
////                        .password("030701")
////                        .roles("admin")
////                        .build();
////
////        return new InMemoryUserDetailsManager(user);
////    }
//}