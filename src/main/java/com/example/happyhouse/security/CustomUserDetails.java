package com.example.happyhouse.security;

import com.example.happyhouse.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final Long id;
    private final String username;
    private final String userfirstname;
    private final String password;
    // Если у вас есть роли или authorities, можно их добавить
    // private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(User user) {
        this.id = user.getUserId(); // Предполагается, что в модели User есть поле userId или id
        this.username = user.getEmail(); // или другой уникальный идентификатор
        this.userfirstname = user.getFirstName();
        this.password = user.getPasswordHash();
        // Если есть роли:
        // this.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole()));
    }

    public Long getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Здесь можно настроить роли пользователя
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    // В этих методах можно добавить свою логику (например, блокировка аккаунта и т.п.)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
