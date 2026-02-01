package com.ftr.ai_tools_for_devs.service

import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerRequestDTO
import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerRequestDTO.Companion.toEntity
import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerUpdateRequestDTO
import com.ftr.ai_tools_for_devs.models.Customer
import com.ftr.ai_tools_for_devs.repository.CustomerRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class CustomerService(
    private val customerRepository: CustomerRepository
) {

    fun findAll(): List<Customer> {
        return customerRepository.findByDeletedAtIsNull()
    }

    fun findById(id: Long): Customer {
        return customerRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { NoSuchElementException("Customer not found with id: $id") }
    }

    fun create(request: CustomerRequestDTO): Customer {
        val customer = request.toEntity()
        return customerRepository.save(customer)
    }

    fun update(id: Long, request: CustomerUpdateRequestDTO): Customer {
        val customer = findById(id)
        
        request.name?.let { customer.name = it }
        request.email?.let { customer.email = it }
        request.phone?.let { customer.phone = it }
        
        return customerRepository.save(customer)
    }

    fun delete(id: Long) {
        val customer = findById(id)
        customer.deletedAt = LocalDateTime.now()
        customerRepository.save(customer)
    }
}
