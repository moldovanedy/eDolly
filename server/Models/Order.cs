using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Orders")]
    public class Order
    {
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}
