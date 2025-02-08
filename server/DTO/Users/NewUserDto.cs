namespace Server.DTO.Users
{
    public record NewUserDto(
        string Name, 
        string Email, 
        string Password,
        string Phone);
}