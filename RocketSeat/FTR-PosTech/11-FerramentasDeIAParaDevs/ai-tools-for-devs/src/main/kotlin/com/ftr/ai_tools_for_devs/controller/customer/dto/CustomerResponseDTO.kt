package com.ftr.ai_tools_for_devs.controller.customer.dto

import com.ftr.ai_tools_for_devs.models.Customer
import java.time.LocalDateTime

data class CustomerResponseDTO(
    val id: Long,
    val name: String,
    val phone: String?,
    val email: String,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
    val deletedAt: LocalDateTime?
) {
    companion object {
        fun Customer.toResponseDTO(): CustomerResponseDTO =
            CustomerResponseDTO(
                id = this.id!!,
                name = this.name,
                phone = this.phone,
                email = this.email,
                createdAt = this.createdAt,
                updatedAt = this.updatedAt,
                deletedAt = this.deletedAt
            )
    }
}