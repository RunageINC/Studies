package com.ftr.ai_tools_for_devs.controller.product

import com.ftr.ai_tools_for_devs.controller.product.dto.ProductRequestDTO
import com.ftr.ai_tools_for_devs.controller.product.dto.ProductResponseDTO
import com.ftr.ai_tools_for_devs.controller.product.dto.ProductResponseDTO.Companion.toResponseDTO
import com.ftr.ai_tools_for_devs.models.Product
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.math.BigDecimal
import java.util.UUID

@RestController
@RequestMapping("/product")
class ProductController() {

    @GetMapping
    fun getProduct(): ResponseEntity<ProductResponseDTO> {
        return ResponseEntity.ok(
            Product(
                name = "test",
                description = "test product",
                price = BigDecimal("19.99"),
                stock = 10
            ).toResponseDTO()
        )
    }

    @GetMapping("/{id}")
    fun getProductById(@PathVariable id: String): ResponseEntity<ProductResponseDTO> {
        val uuid = try {
            UUID.fromString(id)
        } catch (e: IllegalArgumentException) {
            throw IllegalArgumentException("Invalid ID")
        }

        val product = Product(
            id = uuid,
            name = "test",
            description = "test product",
            price = BigDecimal("19.99"),
            stock = 10
        )

        return ResponseEntity.ok(product.toResponseDTO())
    }

    @PostMapping
    fun saveProduct(@RequestBody @Valid body: ProductRequestDTO): ResponseEntity<Void> {
        println(body.toString())

        return ResponseEntity(HttpStatus.CREATED)
    }

    @PutMapping("/{id}")
    fun updateProductById(
        @PathVariable id: UUID,
        @RequestBody @Valid update: ProductRequestDTO
    ): ResponseEntity<Void> {
        println(update.toString())

        return ResponseEntity(HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteProductById(@PathVariable id: UUID): ResponseEntity<Void> {
        return ResponseEntity.noContent().build()
    }
}
