package com.ftr.ai_tools_for_devs.models

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "customers")
class Customer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false, unique = true)
    var email: String,

    @Column(nullable = true)
    var phone: String? = null,

    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "updated_at", nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now(),

    @Column(name = "deleted_at", nullable = true)
    var deletedAt: LocalDateTime? = null,

    /**
     * One-to-Many relationship: One Customer can have many Products.
     * Cardinality: 1:N (Customer:Products)
     * - A single customer can own/purchase multiple products
     * - This side holds the collection of related products
     * - mappedBy indicates that Product.customer owns the relationship
     * - CascadeType.ALL propagates all operations to associated products
     * - orphanRemoval ensures products are deleted when removed from the list
     */
    @OneToMany(mappedBy = "customer", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    val products: MutableList<Product> = mutableListOf()
) {
    /**
     * Adds a product to this customer's list and sets the bidirectional relationship.
     */
    fun addProduct(product: Product) {
        products.add(product)
        product.customer = this
    }

    /**
     * Removes a product from this customer's list and clears the bidirectional relationship.
     */
    fun removeProduct(product: Product) {
        products.remove(product)
        product.customer = null
    }

    @PreUpdate
    fun onUpdate() {
        updatedAt = LocalDateTime.now()
    }
}