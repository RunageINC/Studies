package com.ftr.ai_tools_for_devs.controller.customer

import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerRequestDTO
import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerResponseDTO
import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerResponseDTO.Companion.toResponseDTO
import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerUpdateRequestDTO
import com.ftr.ai_tools_for_devs.service.CustomerService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder

/**
 * REST controller for Customer resource operations.
 *
 * Base path: `/customer`
 *
 * Provides CRUD operations for managing customers in the system.
 */
@RestController
@RequestMapping("/customer")
class CustomerController(
    private val customerService: CustomerService
) {

    /**
     * Retrieves all customers.
     *
     * **HTTP:** `GET /customer`
     *
     * @return [ResponseEntity] wrapping [List]<[CustomerResponseDTO]> with status 200 OK
     */
    @GetMapping
    fun getAllCustomers(): ResponseEntity<List<CustomerResponseDTO>> {
        val customers = customerService.findAll().map { it.toResponseDTO() }
        return ResponseEntity.ok(customers)
    }

    /**
     * Retrieves a single customer by ID.
     *
     * **HTTP:** `GET /customer/{id}`
     *
     * @param id Customer identifier (path variable). Type: [Long]
     * @return [ResponseEntity] wrapping [CustomerResponseDTO] with status 200 OK
     * @throws java.util.NoSuchElementException when customer with given id does not exist
     */
    @GetMapping("/{id}")
    fun getCustomerById(@PathVariable id: Long): ResponseEntity<CustomerResponseDTO> {
        val customer = customerService.findById(id)
        return ResponseEntity.ok(customer.toResponseDTO())
    }

    /**
     * Creates a new customer.
     *
     * **HTTP:** `POST /customer`
     *
     * Request body is validated. Required fields: `name`, `email` (must be valid format).
     *
     * @param body Request body. Type: [CustomerRequestDTO]. Fields: name (required), phone (optional), email (required, valid format)
     * @return [ResponseEntity] wrapping [CustomerResponseDTO] with status 201 Created and `Location` header pointing to the new resource
     * @throws org.springframework.web.bind.MethodArgumentNotValidException when validation fails
     */
    @PostMapping
    fun createCustomer(@RequestBody @Valid body: CustomerRequestDTO): ResponseEntity<CustomerResponseDTO> {
        val customer = customerService.create(body)
        val location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(customer.id)
            .toUri()
        return ResponseEntity.created(location).body(customer.toResponseDTO())
    }

    /**
     * Updates an existing customer by ID.
     *
     * **HTTP:** `PUT /customer/{id}`
     *
     * All fields in the request body are optional; only provided fields will be updated.
     *
     * @param id Customer identifier (path variable). Type: [Long]
     * @param update Request body. Type: [CustomerUpdateRequestDTO]. All fields optional: name, phone, email (must be valid if provided)
     * @return [ResponseEntity] wrapping [CustomerResponseDTO] with status 200 OK
     * @throws java.util.NoSuchElementException when customer with given id does not exist
     * @throws org.springframework.web.bind.MethodArgumentNotValidException when validation fails
     */
    @PutMapping("/{id}")
    fun updateCustomerById(
        @PathVariable id: Long,
        @RequestBody @Valid update: CustomerUpdateRequestDTO
    ): ResponseEntity<CustomerResponseDTO> {
        val customer = customerService.update(id, update)
        return ResponseEntity.ok(customer.toResponseDTO())
    }

    /**
     * Deletes a customer by ID.
     *
     * **HTTP:** `DELETE /customer/{id}`
     *
     * @param id Customer identifier (path variable). Type: [Long]
     * @return [ResponseEntity] with no body and status 204 No Content
     * @throws java.util.NoSuchElementException when customer with given id does not exist
     */
    @DeleteMapping("/{id}")
    fun deleteCustomerById(@PathVariable id: Long): ResponseEntity<Void> {
        customerService.delete(id)
        return ResponseEntity.noContent().build()
    }
}