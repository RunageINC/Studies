package com.ftr.ai_tools_for_devs.controller.customer.dto

import jakarta.annotation.Nullable
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull

data class CustomerRequestDTO(
    val name: String,
    @Nullable
    val phone: String,
    @NotNull
    @Email
    val email: String,
)
