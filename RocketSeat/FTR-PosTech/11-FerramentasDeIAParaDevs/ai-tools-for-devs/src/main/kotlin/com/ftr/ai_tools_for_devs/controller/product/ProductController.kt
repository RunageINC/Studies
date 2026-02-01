package com.ftr.ai_tools_for_devs.controller.product

import com.ftr.ai_tools_for_devs.controller.product.dto.ProductRequestDTO
import com.ftr.ai_tools_for_devs.controller.product.dto.ProductResponseDTO
import com.ftr.ai_tools_for_devs.controller.product.dto.ProductResponseDTO.Companion.toResponseDTO
import com.ftr.ai_tools_for_devs.controller.product.dto.ProductUpdateRequestDTO
import com.ftr.ai_tools_for_devs.service.ProductService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder

@RestController
@RequestMapping("/product")
class ProductController(
    private val productService: ProductService
) {

    @GetMapping
    fun getAllProducts(): ResponseEntity<List<ProductResponseDTO>> {
        val products = productService.findAll().map { it.toResponseDTO() }
        return ResponseEntity.ok(products)
    }

    @GetMapping("/{id}")
    fun getProductById(@PathVariable id: Long): ResponseEntity<ProductResponseDTO> {
        val product = productService.findById(id)
        return ResponseEntity.ok(product.toResponseDTO())
    }

    @PostMapping
    fun createProduct(@RequestBody @Valid body: ProductRequestDTO): ResponseEntity<ProductResponseDTO> {
        val product = productService.create(body)
        val location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(product.id)
            .toUri()
        return ResponseEntity.created(location).body(product.toResponseDTO())
    }

    @PutMapping("/{id}")
    fun updateProductById(
        @PathVariable id: Long,
        @RequestBody @Valid update: ProductUpdateRequestDTO
    ): ResponseEntity<ProductResponseDTO> {
        val product = productService.update(id, update)
        return ResponseEntity.ok(product.toResponseDTO())
    }

    @DeleteMapping("/{id}")
    fun deleteProductById(@PathVariable id: Long): ResponseEntity<Void> {
        productService.delete(id)
        return ResponseEntity.noContent().build()
    }
}
