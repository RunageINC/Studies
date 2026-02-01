package com.ftr.ai_tools_for_devs.controller.product.dto

import com.ftr.ai_tools_for_devs.models.Product
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Digits
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

data class ProductRequestDTO(
    @field:NotBlank(message = "Name is required")
    val name: String,
    val description: String? = null,
    @field:NotNull(message = "Price is required")
    @field:DecimalMin(value = "0.0", inclusive = true, message = "Price must be at least 0")
    @field:Digits(integer = 10, fraction = 2, message = "Price must have at most 2 decimal places")
    val price: BigDecimal,
    @field:NotNull(message = "Stock is required")
    @field:Min(value = 0, message = "Stock must be at least 0")
    val stock: Int
) {
    companion object {
        fun ProductRequestDTO.toEntity(): Product =
            Product(
                name = this.name,
                description = this.description,
                price = this.price,
                stock = this.stock
            )
    }
}
