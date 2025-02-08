using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Categories")]
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
    }
}
