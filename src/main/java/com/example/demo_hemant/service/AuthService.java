package com.example.demo_hemant.service;

import com.example.demo_hemant.dao.UserDao;
import com.example.demo_hemant.dto.AuthRequest;
import com.example.demo_hemant.dto.AuthResponse;
import com.example.demo_hemant.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserDao userDao;

    public AuthResponse signup(AuthRequest request) {
        // Check if username already exists
        if (userDao.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        // In production, use proper password hashing (BCrypt)
        user.setPassword(encodePassword(request.getPassword()));

        user = userDao.save(user);

        // Generate token
        String token = generateToken(user);

        return new AuthResponse(token, AuthResponse.UserDto.fromUser(user));
    }

    public AuthResponse login(AuthRequest request) {
        // Find user by username
        User user = userDao.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        // Verify password
        if (!verifyPassword(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Generate token
        String token = generateToken(user);

        return new AuthResponse(token, AuthResponse.UserDto.fromUser(user));
    }

    private String encodePassword(String password) {
        // Simple Base64 encoding for demo - USE BCrypt in production!
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    private boolean verifyPassword(String rawPassword, String encodedPassword) {
        String encoded = Base64.getEncoder().encodeToString(rawPassword.getBytes());
        return encoded.equals(encodedPassword);
    }

    private String generateToken(User user) {
        // Simple token generation - USE JWT in production!
        return Base64.getEncoder().encodeToString(
                (user.getUsername() + ":" + UUID.randomUUID()).getBytes()
        );
    }
}
