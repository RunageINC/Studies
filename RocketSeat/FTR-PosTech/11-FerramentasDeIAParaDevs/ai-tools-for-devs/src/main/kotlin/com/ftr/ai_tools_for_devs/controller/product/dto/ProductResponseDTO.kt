package com.ftr.ai_tools_for_devs.controller.product.dto

import com.ftr.ai_tools_for_devs.models.Product
import java.math.BigDecimal
import java.time.LocalDateTime

data class ProductResponseDTO(
    val id: Long,
    val name: String,
    val description: String?,
    val price: BigDecimal,
    val stock: Int,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime,
    val deletedAt: LocalDateTime?
) {
    companion object {
        fun Product.toResponseDTO(): ProductResponseDTO =
            ProductResponseDTO(
                id = this.id!!,
                name = this.name,
                description = this.description,
                price = this.price,
                stock = this.stock,
                createdAt = this.createdAt,
                updatedAt = this.updatedAt,
                deletedAt = this.deletedAt
            )
    }
}
