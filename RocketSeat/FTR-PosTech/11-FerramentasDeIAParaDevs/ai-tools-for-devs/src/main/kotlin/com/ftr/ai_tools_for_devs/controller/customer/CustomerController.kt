package com.ftr.ai_tools_for_devs.controller.customer

import Customer
import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerRequestDTO
import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerResponseDTO
import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerResponseDTO.Companion.toResponseDTO
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/customer")
class CustomerController() {

    @GetMapping
    fun getCustomer(): ResponseEntity<CustomerResponseDTO> {
        return ResponseEntity.ok(CustomerResponseDTO("test", "12345", "test@test.com"))
    }

    @GetMapping("/{id}")
    fun getCustomerById(@PathVariable id: String): ResponseEntity<CustomerResponseDTO> {
        val numericId = id.toLongOrNull() ?: throw IllegalArgumentException("Invalid ID");

        val customer = Customer(
            name = "test",
            phone = "12345",
            email = "test@test.com"
        )

        return ResponseEntity.ok(customer.toResponseDTO())
    }

    @PostMapping
    fun saveCustomer(@RequestBody @Valid body: CustomerRequestDTO): ResponseEntity<Void> {
        println(body.toString())

        return ResponseEntity(HttpStatus.CREATED)
    }

    @PutMapping("/{id}")
    fun updateCustomerById(
        @PathVariable id: Long,
        @RequestBody @Valid update: CustomerRequestDTO
    ): ResponseEntity<Void> {
        println(update.toString())

        return ResponseEntity(HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteCustomerById(@PathVariable id: Long): ResponseEntity<Void> {
        return ResponseEntity.noContent().build()
    }
}