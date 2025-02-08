using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext() {}
    
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(Program.ConnectionString, Program.ServerVersion);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(prod =>
            {
                prod.HasKey(nameof(Product.Id));
                prod.HasIndex(p => p.Id).IsUnique();
                prod.HasIndex(p => p.Name).IsUnique();
                prod.HasIndex(p => p.Price).IsDescending(false);

                prod.Property(m => m.Id)
                    .IsRequired()
                    .HasColumnType("VARCHAR(36)");

                prod.Property(m => m.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            
                prod.Property(m => m.Price)
                    .IsRequired()
                    .HasDefaultValue(0);
            
                prod.Property(m => m.Stock)
                    .IsRequired()
                    .HasDefaultValue(0);

                prod.Property(m => m.Description)
                    .IsRequired()
                    .HasMaxLength(65_535);
            });
        
            modelBuilder.Entity<Category>(category =>
            {
                category.HasKey(nameof(Category.Id));
                category.HasIndex(p => p.Id).IsUnique();
                category.HasIndex(p => p.Name).IsUnique();

                category.Property(m => m.Id)
                        .IsRequired()
                        .HasColumnType("VARCHAR(36)");

                category.Property(m => m.Name)
                        .IsRequired()
                        .HasMaxLength(255);
            });
        
            modelBuilder.Entity<User>(user =>
            {
                user.HasKey(nameof(User.Id));
                user.HasIndex(p => p.Id).IsUnique();
                user.HasIndex(p => p.Email).IsUnique();

                user.Property(m => m.Id)
                    .IsRequired()
                    .HasColumnType("VARCHAR(36)");

                user.Property(m => m.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            
                user.Property(m => m.Email)
                    .IsRequired()
                    .HasMaxLength(255);
            
                user.Property(m => m.Password)
                    .IsRequired()
                    .HasMaxLength(255);

                user.Property(m => m.Phone)
                    .IsRequired()
                    .HasMaxLength(15);

                user.Property(m => m.AuthToken)
                    .HasMaxLength(255);
            });
        
            modelBuilder.Entity<Order>(order =>
            {
                order.HasKey(nameof(Order.Id));
                order.HasIndex(p => p.Id).IsUnique();

                order.Property(m => m.Id)
                     .IsRequired()
                     .HasColumnType("VARCHAR(36)");
            });
        }
    }
}
