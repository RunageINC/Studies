package com.ftr.ai_tools_for_devs.controller.customer.dto

import com.ftr.ai_tools_for_devs.models.Customer
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class CustomerRequestDTO(
    @field:NotBlank(message = "Name is required")
    val name: String,
    val phone: String? = null,
    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Email must be valid")
    val email: String
) {
    companion object {
        fun CustomerRequestDTO.toEntity(): Customer =
            Customer(
                name = this.name,
                email = this.email,
                phone = this.phone
            )
    }
}
