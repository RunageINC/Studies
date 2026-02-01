package com.ftr.ai_tools_for_devs.repository

import com.ftr.ai_tools_for_devs.models.Customer
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface CustomerRepository : JpaRepository<Customer, Long> {
    
    fun findByEmail(email: String): Optional<Customer>
    
    fun findByDeletedAtIsNull(): List<Customer>
    
    fun findByIdAndDeletedAtIsNull(id: Long): Optional<Customer>
}
