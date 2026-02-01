package com.ftr.ai_tools_for_devs.service

import com.ftr.ai_tools_for_devs.controller.product.dto.ProductRequestDTO
import com.ftr.ai_tools_for_devs.controller.product.dto.ProductRequestDTO.Companion.toEntity
import com.ftr.ai_tools_for_devs.controller.product.dto.ProductUpdateRequestDTO
import com.ftr.ai_tools_for_devs.models.Product
import com.ftr.ai_tools_for_devs.repository.ProductRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class ProductService(
    private val productRepository: ProductRepository
) {

    fun findAll(): List<Product> {
        return productRepository.findByDeletedAtIsNull()
    }

    fun findById(id: Long): Product {
        return productRepository.findByIdAndDeletedAtIsNull(id)
            .orElseThrow { NoSuchElementException("Product not found with id: $id") }
    }

    fun create(request: ProductRequestDTO): Product {
        val product = request.toEntity()
        return productRepository.save(product)
    }

    fun update(id: Long, request: ProductUpdateRequestDTO): Product {
        val product = findById(id)
        
        request.name?.let { product.name = it }
        request.description?.let { product.description = it }
        request.price?.let { product.price = it }
        request.stock?.let { product.stock = it }
        
        return productRepository.save(product)
    }

    fun delete(id: Long) {
        val product = findById(id)
        product.deletedAt = LocalDateTime.now()
        productRepository.save(product)
    }
}
