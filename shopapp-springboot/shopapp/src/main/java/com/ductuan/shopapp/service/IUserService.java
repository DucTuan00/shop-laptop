package com.ductuan.shopapp.service;

import com.ductuan.shopapp.dto.UpdateUserDTO;
import com.ductuan.shopapp.dto.UserDTO;
import com.ductuan.shopapp.exception.DataNotFoundException;
import com.ductuan.shopapp.model.User;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    String login(String phoneNumber, String password, Long roleId) throws Exception;
    User getUserDetailsFromToken(String token) throws Exception;
    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;
}
