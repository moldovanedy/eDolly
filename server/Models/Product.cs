using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Products")]
    public class Product
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public double Price { get; set; }
        public double Stock { get; set; }
        //category
        public string Description { get; set; } = string.Empty;
        //specifications
    }
}
