package com.ftr.ai_tools_for_devs.repository

import com.ftr.ai_tools_for_devs.models.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface ProductRepository : JpaRepository<Product, Long> {
    
    fun findByDeletedAtIsNull(): List<Product>
    
    fun findByIdAndDeletedAtIsNull(id: Long): Optional<Product>
    
    fun findByCustomerId(customerId: Long): List<Product>
}
