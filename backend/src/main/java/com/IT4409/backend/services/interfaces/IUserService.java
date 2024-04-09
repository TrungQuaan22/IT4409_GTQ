package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.entities.User;

import java.util.List;

public interface IUserService {
    User findUserProfileByJwt(String jwt) throws Exception;

    List<User> findAllUsers();
}
