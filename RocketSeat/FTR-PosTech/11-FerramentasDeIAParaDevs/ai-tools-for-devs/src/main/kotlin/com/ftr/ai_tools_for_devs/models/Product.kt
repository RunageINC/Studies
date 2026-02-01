package com.ftr.ai_tools_for_devs.models

import com.ftr.ai_tools_for_devs.controller.product.dto.ProductRequestDTO
import jakarta.annotation.Nullable
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Digits
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal
import java.time.ZonedDateTime
import java.util.UUID

data class Product(
    val id: UUID = UUID.randomUUID(),
    @NotNull val name: String,
    @Nullable val description: String?,
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @Digits(integer = 10, fraction = 2)
    val price: BigDecimal,
    @NotNull val stock: Int,
    val createdAt: ZonedDateTime = ZonedDateTime.now()
) {
    init {
        require(price.scale() <= 2) { "Price must have at most 2 decimal places" }
    }

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
