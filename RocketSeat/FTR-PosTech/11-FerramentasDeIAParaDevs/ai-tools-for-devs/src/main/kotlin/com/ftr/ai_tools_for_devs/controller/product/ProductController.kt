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

/**
 * REST controller for Product resource operations.
 *
 * Base path: `/product`
 *
 * Provides CRUD operations for managing products in the system.
 */
@RestController
@RequestMapping("/product")
class ProductController(
    private val productService: ProductService
) {

    /**
     * Retrieves all products.
     *
     * **HTTP:** `GET /product`
     *
     * @return [ResponseEntity] wrapping [List]<[ProductResponseDTO]> with status 200 OK
     */
    @GetMapping
    fun getAllProducts(): ResponseEntity<List<ProductResponseDTO>> {
        val products = productService.findAll().map { it.toResponseDTO() }
        return ResponseEntity.ok(products)
    }

    /**
     * Retrieves a single product by ID.
     *
     * **HTTP:** `GET /product/{id}`
     *
     * @param id Product identifier (path variable). Type: [Long]
     * @return [ResponseEntity] wrapping [ProductResponseDTO] with status 200 OK
     * @throws java.util.NoSuchElementException when product with given id does not exist
     */
    @GetMapping("/{id}")
    fun getProductById(@PathVariable id: Long): ResponseEntity<ProductResponseDTO> {
        val product = productService.findById(id)
        return ResponseEntity.ok(product.toResponseDTO())
    }

    /**
     * Creates a new product.
     *
     * **HTTP:** `POST /product`
     *
     * Request body is validated. Required: `name`, `price` (≥ 0, max 2 decimals), `stock` (≥ 0).
     *
     * @param body Request body. Type: [ProductRequestDTO]. Fields: name (required), description (optional),
     *             price (required, ≥ 0, max 2 decimals), stock (required, ≥ 0)
     * @return [ResponseEntity] wrapping [ProductResponseDTO] with status 201 Created and `Location` header pointing to the new resource
     * @throws org.springframework.web.bind.MethodArgumentNotValidException when validation fails
     */
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

    /**
     * Updates an existing product by ID.
     *
     * **HTTP:** `PUT /product/{id}`
     *
     * All fields in the request body are optional; only provided fields will be updated.
     *
     * @param id Product identifier (path variable). Type: [Long]
     * @param update Request body. Type: [ProductUpdateRequestDTO]. All fields optional: name, description,
     *               price (≥ 0, max 2 decimals if provided), stock (≥ 0 if provided)
     * @return [ResponseEntity] wrapping [ProductResponseDTO] with status 200 OK
     * @throws java.util.NoSuchElementException when product with given id does not exist
     * @throws org.springframework.web.bind.MethodArgumentNotValidException when validation fails
     */
    @PutMapping("/{id}")
    fun updateProductById(
        @PathVariable id: Long,
        @RequestBody @Valid update: ProductUpdateRequestDTO
    ): ResponseEntity<ProductResponseDTO> {
        val product = productService.update(id, update)
        return ResponseEntity.ok(product.toResponseDTO())
    }

    /**
     * Deletes a product by ID.
     *
     * **HTTP:** `DELETE /product/{id}`
     *
     * @param id Product identifier (path variable). Type: [Long]
     * @return [ResponseEntity] with no body and status 204 No Content
     * @throws java.util.NoSuchElementException when product with given id does not exist
     */
    @DeleteMapping("/{id}")
    fun deleteProductById(@PathVariable id: Long): ResponseEntity<Void> {
        productService.delete(id)
        return ResponseEntity.noContent().build()
    }
}
