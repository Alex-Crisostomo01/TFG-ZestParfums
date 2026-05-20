import { Header } from "../components/Header";
import { useState } from "react";
import { Sparkles, Award, Users, Globe } from "lucide-react";

export default function About() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen bg-background dark:bg-card">
      <Header onSearchChange={setSearchValue} searchValue={searchValue} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/5 dark:via-transparent dark:to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/20 dark:border-primary/30">
                <Sparkles className="w-4 h-4" />
                Nuestra Historia
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-light tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Zest Parfums
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Donde la esencia del lujo y la elegancia se encuentran en cada gota
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-light text-foreground mb-4">
                Nuestra Misión
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En Zest Parfums, creemos que cada persona merece descubrir la fragancia 
                que refleje su esencia única. Nuestro compromiso es proporcionar 
                perfumes de la más alta calidad, seleccionados cuidadosamente de las 
                mejores marcas del mundo.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-light text-foreground mb-4">
                Nuestra Visión
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Aspiramos a ser la plataforma de referencia para los amantes de 
                las fragancias premium, ofreciendo no solo productos excepcionales, 
                sino también una experiencia personalizada e inolvidable en cada compra.
              </p>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20 dark:border-primary/30 hover:border-primary/40 dark:hover:border-primary/50 transition-colors">
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-3xl font-light text-foreground mb-2">500+</h3>
              <p className="text-sm text-muted-foreground">Fragancias Premium</p>
            </div>
            <div className="bg-secondary/5 dark:bg-secondary/10 rounded-2xl p-8 border border-secondary/20 dark:border-secondary/30 hover:border-secondary/40 dark:hover:border-secondary/50 transition-colors">
              <Users className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-3xl font-light text-foreground mb-2">10K+</h3>
              <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
            </div>
            <div className="bg-accent/5 dark:bg-accent/10 rounded-2xl p-8 border border-accent/20 dark:border-accent/30 hover:border-accent/40 dark:hover:border-accent/50 transition-colors col-span-2">
              <Globe className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-3xl font-light text-foreground mb-2">50+</h3>
              <p className="text-sm text-muted-foreground">Marcas de Lujo Internacionales</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-primary/95 dark:bg-primary rounded-3xl p-12 text-primary-foreground dark:text-foreground">
          <h2 className="text-3xl font-light mb-12 text-center">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary-foreground/20 dark:bg-foreground/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground dark:text-foreground" />
              </div>
              <h3 className="text-xl font-light">Calidad Premium</h3>
              <p className="text-primary-foreground/80 dark:text-muted-foreground">
                Solo ofrecemos fragancias auténticas de las mejores marcas del mundo.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary-foreground/20 dark:bg-foreground/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground dark:text-foreground" />
              </div>
              <h3 className="text-xl font-light">Experiencia Personalizada</h3>
              <p className="text-primary-foreground/80 dark:text-muted-foreground">
                Cada cliente recibe atención y recomendaciones adaptadas a sus preferencias.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary-foreground/20 dark:bg-foreground/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-foreground dark:text-foreground" />
              </div>
              <h3 className="text-xl font-light">Excelencia en Servicio</h3>
              <p className="text-primary-foreground/80 dark:text-muted-foreground">
                Comprometidos con superar las expectativas en cada interacción.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-light text-foreground mb-4">
            Apasionados por las Fragancias
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Nuestro equipo está compuesto por expertos en fragancias con años de experiencia 
            en la industria de la perfumería de lujo.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 dark:bg-primary/10 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-foreground mb-6">
            Descubre Tu Fragancia Perfecta
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Utiliza nuestro bot recomendador para encontrar la fragancia que mejor se adapte a tu personalidad y necesidades.
          </p>
          <a
            href="/recommender"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground dark:text-foreground rounded-full font-medium hover:shadow-lg dark:shadow-lg transition-all hover:scale-105"
          >
            Ir al Bot Recomendador →
          </a>
        </div>
      </section>
    </div>
  );
}
