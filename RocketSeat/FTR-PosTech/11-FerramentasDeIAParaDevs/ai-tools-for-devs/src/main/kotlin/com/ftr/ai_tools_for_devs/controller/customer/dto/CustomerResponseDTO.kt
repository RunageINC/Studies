package com.ftr.ai_tools_for_devs.controller.customer.dto

import Customer

data class CustomerResponseDTO(
    val name: String,
    val phone: String,
    val email: String,
) {
    companion object {
        fun Customer.toResponseDTO(): CustomerResponseDTO =
            CustomerResponseDTO(
                name = this.name,
                phone = this.phone,
                email = this.email
            )
    }
}