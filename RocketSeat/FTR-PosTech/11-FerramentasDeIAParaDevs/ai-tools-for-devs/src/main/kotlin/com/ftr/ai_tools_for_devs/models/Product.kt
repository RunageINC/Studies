package com.ftr.ai_tools_for_devs.models

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime

@Entity
@Table(name = "products")
class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = true)
    var description: String? = null,

    @Column(nullable = false, precision = 10, scale = 2)
    var price: BigDecimal,

    @Column(nullable = false)
    var stock: Int,

    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "deleted_at", nullable = true)
    var deletedAt: LocalDateTime? = null,

    /**
     * Many-to-One relationship: Many Products can belong to one Customer.
     * Cardinality: N:1 (Products:Customer)
     * - Multiple products can be associated with a single customer
     * - This is the owning side of the relationship (holds the foreign key reference)
     * - JoinColumn specifies the foreign key column name in the products table
     * - Nullable: A product may not be assigned to any customer yet
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = true)
    var customer: Customer? = null
) {
    init {
        require(price.scale() <= 2) { "Price must have at most 2 decimal places" }
    }

    @PreUpdate
    fun onUpdate() {
        updatedAt = LocalDateTime.now()
    }
}
