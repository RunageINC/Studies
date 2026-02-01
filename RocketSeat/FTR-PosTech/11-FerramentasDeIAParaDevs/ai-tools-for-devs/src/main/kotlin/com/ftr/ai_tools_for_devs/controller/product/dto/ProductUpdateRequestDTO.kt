package com.ftr.ai_tools_for_devs.controller.product.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Digits
import jakarta.validation.constraints.Min
import java.math.BigDecimal

data class ProductUpdateRequestDTO(
    val name: String? = null,
    val description: String? = null,
    @field:DecimalMin(value = "0.0", inclusive = true)
    @field:Digits(integer = 10, fraction = 2)
    val price: BigDecimal? = null,
    @field:Min(0)
    val stock: Int? = null
)
