package com.ftr.ai_tools_for_devs.controller.product.dto

import jakarta.annotation.Nullable
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Digits
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

data class ProductRequestDTO(
    @NotNull val name: String,
    @Nullable val description: String?,
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @Digits(integer = 10, fraction = 2)
    val price: BigDecimal,
    @NotNull val stock: Int,
)
