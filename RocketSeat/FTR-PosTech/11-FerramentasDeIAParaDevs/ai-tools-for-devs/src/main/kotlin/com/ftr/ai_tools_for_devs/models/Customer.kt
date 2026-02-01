import com.ftr.ai_tools_for_devs.controller.customer.dto.CustomerRequestDTO
import jakarta.annotation.Nullable
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotNull

data class Customer(
    @NotNull val name: String,
    @NotNull @Email val email: String,
    @Nullable val phone: String
) {
    companion object {
        fun CustomerRequestDTO.toEntity(): Customer =
            Customer(
                name = this.name,
                email = this.email,
                phone = this.phone
            )
    }
}