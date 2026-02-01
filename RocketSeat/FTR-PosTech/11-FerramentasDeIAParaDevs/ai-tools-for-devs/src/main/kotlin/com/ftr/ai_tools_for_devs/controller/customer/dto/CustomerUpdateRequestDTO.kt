package com.ftr.ai_tools_for_devs.controller.customer.dto

import jakarta.validation.constraints.Email

data class CustomerUpdateRequestDTO(
    val name: String? = null,
    val phone: String? = null,
    @field:Email
    val email: String? = null
)
