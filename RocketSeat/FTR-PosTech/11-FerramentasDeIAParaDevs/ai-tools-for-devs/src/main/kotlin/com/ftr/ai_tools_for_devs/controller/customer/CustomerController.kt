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

@RestController
@RequestMapping("/customer")
class CustomerController(
    private val customerService: CustomerService
) {

    @GetMapping
    fun getAllCustomers(): ResponseEntity<List<CustomerResponseDTO>> {
        val customers = customerService.findAll().map { it.toResponseDTO() }
        return ResponseEntity.ok(customers)
    }

    @GetMapping("/{id}")
    fun getCustomerById(@PathVariable id: Long): ResponseEntity<CustomerResponseDTO> {
        val customer = customerService.findById(id)
        return ResponseEntity.ok(customer.toResponseDTO())
    }

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

    @PutMapping("/{id}")
    fun updateCustomerById(
        @PathVariable id: Long,
        @RequestBody @Valid update: CustomerUpdateRequestDTO
    ): ResponseEntity<CustomerResponseDTO> {
        val customer = customerService.update(id, update)
        return ResponseEntity.ok(customer.toResponseDTO())
    }

    @DeleteMapping("/{id}")
    fun deleteCustomerById(@PathVariable id: Long): ResponseEntity<Void> {
        customerService.delete(id)
        return ResponseEntity.noContent().build()
    }
}