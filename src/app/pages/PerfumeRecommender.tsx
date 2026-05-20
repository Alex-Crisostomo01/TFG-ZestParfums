import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { ChevronRight, Sparkles, MessageCircle, Heart, Loader2 } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import api from "../../api/axios";

interface BackendMarcaDTO {
  id?: number;
  id_marca?: number;
  nombre: string;
  paisOrigen?: string;
  descripcion?: string;
  activo?: number;
  logoUrl?: string;
}

interface BackendPerfumeDTO {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio?: number;
  imagenUrl?: string;
  idCategoria?: number;
  categoria?: string;
  idGenero?: number;
  genero?: string;
  stock?: number;
  enOferta?: boolean;
  marca?: BackendMarcaDTO;
}

type QuestionType = "gender" | "preference" | "occasion" | "intensity" | "review";

interface Question {
  id: QuestionType;
  title: string;
  description: string;
  options: { id: string; label: string; icon?: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "gender",
    title: "¿Para quién es?",
    description: "Selecciona el género de la fragancia que buscas",
    options: [
      { id: "hombre", label: "Hombre", icon: "👨" },
      { id: "mujer", label: "Mujer", icon: "👩" },
      { id: "unisex", label: "Unisex", icon: "✦" },
    ],
  },
  {
    id: "occasion",
    title: "¿Para qué ocasión?",
    description: "¿Cuándo planeas usar esta fragancia?",
    options: [
      { id: "diaria", label: "Uso Diario", icon: "☀️" },
      { id: "noche", label: "Noche Especial", icon: "🌙" },
      { id: "trabajo", label: "Trabajo/Profesional", icon: "💼" },
      { id: "deporte", label: "Deporte/Casual", icon: "⚡" },
    ],
  },
  {
    id: "preference",
    title: "¿Qué tipo de aroma prefieres?",
    description: "Selecciona los perfiles aromáticos que te atraen",
    options: [
      { id: "floral", label: "Floral", icon: "🌸" },
      { id: "frutal", label: "Frutal", icon: "🍊" },
      { id: "woody", label: "Madera/Oriental", icon: "🌲" },
      { id: "fresco", label: "Fresco/Cítrico", icon: "🍋" },
      { id: "aromático", label: "Aromático/Especiado", icon: "🌶️" },
    ],
  },
  {
    id: "intensity",
    title: "¿Qué intensidad prefieres?",
    description: "Elige la proyección y duración que deseas",
    options: [
      { id: "ligera", label: "Ligera y Fresca", icon: "🌬️" },
      { id: "moderada", label: "Moderada", icon: "💨" },
      { id: "intensa", label: "Intensa y Duradera", icon: "🔥" },
    ],
  },
];

export default function PerfumeRecommender() {
  const [searchValue, setSearchValue] = useState("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<QuestionType, string>>({
    gender: "",
    preference: "",
    occasion: "",
    intensity: "",
    review: "",
  });
  const [recommendations, setRecommendations] = useState<BackendPerfumeDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleAnswer = (questionId: QuestionType, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const response = await api.get<BackendPerfumeDTO[]>("/perfumes");
      let filtered = response.data || [];

      // Filter by gender
      if (answers.gender) {
        filtered = filtered.filter(
          (p) =>
            !p.genero ||
            p.genero.toLowerCase().includes(answers.gender.toLowerCase()) ||
            answers.gender.toLowerCase() === "unisex"
        );
      }

      // Sort by relevance and take top recommendations
      filtered = filtered.slice(0, 6);

      setRecommendations(filtered);
      setShowRecommendations(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({
      gender: "",
      preference: "",
      occasion: "",
      intensity: "",
      review: "",
    });
    setRecommendations([]);
    setShowRecommendations(false);
  };

  if (showRecommendations) {
    return (
      <div className="min-h-screen bg-background dark:bg-card">
        <Header onSearchChange={setSearchValue} searchValue={searchValue} />

        {/* Results Header */}
        <section className="relative py-16 bg-primary/5 dark:bg-primary/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-4xl font-light text-foreground">
                Fragancias Recomendadas Para Ti
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Basado en tus preferencias: <span className="font-medium text-foreground">
                {answers.gender}, {answers.occasion}, {answers.intensity}
              </span>
            </p>
            <button
              onClick={reset}
              className="px-6 py-2 border border-border rounded-full text-foreground hover:bg-muted transition-colors font-light"
            >
              ← Volver a Empezar
            </button>
          </div>
        </section>

        {/* Recommendations Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((perfume) => (
                <ProductCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl text-muted-foreground">
                No se encontraron fragancias con los criterios especificados
              </h2>
              <button
                onClick={reset}
                className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-light"
              >
                Intentar Nuevamente
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-background dark:bg-card">
      <Header onSearchChange={setSearchValue} searchValue={searchValue} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/20 dark:border-primary/30">
              <MessageCircle className="w-4 h-4" />
              Bot Inteligente
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight mb-4 text-foreground">
            Encuentra Tu Fragancia Perfecta
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Responde algunas preguntas y te recomendaremos las fragancias que mejor se adapten a ti
          </p>
        </div>
      </section>

      {/* Quiz Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-card dark:bg-primary/5 rounded-3xl shadow-xl p-8 sm:p-12 border border-border dark:border-primary/20">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-muted-foreground">Progreso</h2>
              <span className="text-sm font-medium text-primary">
                {currentStep + 1} de {QUESTIONS.length}
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h3 className="text-3xl font-light text-foreground mb-3">
              {currentQuestion.title}
            </h3>
            <p className="text-lg text-muted-foreground">{currentQuestion.description}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  handleAnswer(currentQuestion.id as QuestionType, option.id)
                }
                className={`relative p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                  answers[currentQuestion.id as QuestionType] === option.id
                    ? "border-primary bg-primary/10 dark:bg-primary/20"
                    : "border-border hover:border-primary/50 bg-muted/30 dark:bg-muted/20 dark:hover:border-primary/40"
                }`}
              >
                <div className="text-4xl mb-3">{option.icon}</div>
                <span className="text-lg font-light text-foreground">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-border rounded-full text-foreground font-medium hover:bg-muted dark:hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Anterior
            </button>

            {currentStep === QUESTIONS.length - 1 ? (
              <button
                onClick={handleGetRecommendations}
                disabled={!answers.gender || loading}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground dark:text-foreground rounded-full font-medium hover:shadow-lg dark:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    Ver Recomendaciones <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() =>
                  answers[currentQuestion.id as QuestionType] &&
                  setCurrentStep(currentStep + 1)
                }
                disabled={!answers[currentQuestion.id as QuestionType]}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground dark:text-foreground rounded-full font-medium hover:shadow-lg dark:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                Siguiente <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20 dark:border-primary/30">
            <Sparkles className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-lg font-light text-foreground mb-2">
              Recomendaciones Personalizadas
            </h4>
            <p className="text-sm text-muted-foreground">
              Nuestro sistema inteligente analiza tus preferencias para encontrar la fragancia perfecta.
            </p>
          </div>
          <div className="bg-secondary/5 dark:bg-secondary/10 rounded-2xl p-8 border border-secondary/20 dark:border-secondary/30">
            <Heart className="w-8 h-8 text-secondary mb-4" />
            <h4 className="text-lg font-light text-foreground mb-2">
              Marcas Premium
            </h4>
            <p className="text-sm text-muted-foreground">
              Acceso a las mejores fragancias de lujo de todo el mundo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
