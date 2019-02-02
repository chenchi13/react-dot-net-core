using System;
using React.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Newtonsoft.Json;

namespace React.DAL
{
    public partial class ReactDBContext : DbContext
    {
        public ReactDBContext()
        {
        }

        public ReactDBContext(DbContextOptions<ReactDBContext> options)
            : base(options)
        {
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                PreserveReferencesHandling = PreserveReferencesHandling.All,
                ReferenceLoopHandling = ReferenceLoopHandling.Serialize
            };
        }

        public virtual DbSet<Drzava> Drzava { get; set; }
        public virtual DbSet<Naselje> Naselje { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Da bi pravilno radilo Promijeniti lokacije DB file name-a ovisno o lokaciji .mdf file-a:
                optionsBuilder.UseSqlServer("Data Source=(LocalDb)\\MSSQLLocalDB;Initial Catalog=KoiosDB;Integrated Security=SSPI;AttachDBFilename=C:\\users\\oluji\\KoiosDB.mdf");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Drzava>(entity =>
            {
                entity.HasKey(e => e.Iddrzava);

                entity.Property(e => e.Iddrzava).HasColumnName("IDDrzava");

                entity.Property(e => e.Naziv).IsRequired();
            });

            modelBuilder.Entity<Naselje>(entity =>
            {
                entity.HasKey(e => e.Idnaselje);

                entity.Property(e => e.Idnaselje).HasColumnName("IDNaselje");

                entity.Property(e => e.DrzavaId).HasColumnName("DrzavaID");

                entity.Property(e => e.Naziv).IsRequired();

                entity.HasOne(d => d.Drzava)
                    .WithMany(p => p.Naselje)
                    .HasForeignKey(d => d.DrzavaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Naselje__DrzavaI__25869641");
            });
        }

    }
}
