import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const CreateFlight = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fromCity: "",
    toCity: "",
    departureDate: "",
    arrivalDate: "",
    airline: "",
    flightNumber: "",
    capacity: "",
    description: "",
    restrictions: [] as string[],
    contactInfo: "",
    preferredCategories: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const restrictionOptions = [
    { id: "no-liquids", label: "Без жидкостей" },
    { id: "no-electronics", label: "Без электроники" },
    { id: "no-food", label: "Без еды" },
    { id: "no-fragile", label: "Без хрупких предметов" },
    { id: "documents-only", label: "Только документы" },
    { id: "small-items", label: "Только мелкие предметы" }
  ];

  const categoryOptions = [
    { id: "documents", label: "Документы" },
    { id: "souvenirs", label: "Сувениры" },
    { id: "food", label: "Продукты питания" },
    { id: "cosmetics", label: "Косметика" },
    { id: "electronics", label: "Электроника" },
    { id: "clothing", label: "Одежда" },
    { id: "books", label: "Книги" },
    { id: "medicine", label: "Лекарства" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fromCity.trim()) newErrors.fromCity = "Укажите город отправления";
    if (!formData.toCity.trim()) newErrors.toCity = "Укажите город назначения";
    if (!formData.departureDate) newErrors.departureDate = "Укажите дату вылета";
    if (!formData.capacity.trim()) newErrors.capacity = "Укажите доступную вместимость";
    if (!formData.description.trim()) newErrors.description = "Добавьте описание";

    const capacity = parseFloat(formData.capacity);
    if (isNaN(capacity) || capacity <= 0) newErrors.capacity = "Вместимость должна быть положительным числом";
    if (capacity > 20) newErrors.capacity = "Максимальная вместимость: 20 кг";

    if (formData.departureDate) {
      const depDate = new Date(formData.departureDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (depDate < today) {
        newErrors.departureDate = "Дата вылета не может быть в прошлом";
      }
    }

    if (formData.arrivalDate && formData.departureDate) {
      const depDate = new Date(formData.departureDate);
      const arrDate = new Date(formData.arrivalDate);
      
      if (arrDate < depDate) {
        newErrors.arrivalDate = "Дата прилета не может быть раньше вылета";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Flight created:", formData);
      setIsSubmitting(false);
      navigate("/traveler-dashboard");
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleRestrictionToggle = (restrictionId: string) => {
    setFormData(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restrictionId)
        ? prev.restrictions.filter(id => id !== restrictionId)
        : [...prev.restrictions, restrictionId]
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      preferredCategories: prev.preferredCategories.includes(categoryId)
        ? prev.preferredCategories.filter(id => id !== categoryId)
        : [...prev.preferredCategories, categoryId]
    }));
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Plane" size={24} className="text-primary" />
            <span className="text-xl font-bold">Попутчик</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/traveler-dashboard">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад к рейсам
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Добавить рейс</h1>
            <p className="text-gray-600">
              Разместите информацию о своем рейсе, чтобы помочь отправителям с доставкой
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Информация о рейсе</CardTitle>
                  <CardDescription>
                    Укажите детали вашего путешествия
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fromCity">Откуда лечу *</Label>
                        <Input
                          id="fromCity"
                          placeholder="Город отправления"
                          value={formData.fromCity}
                          onChange={(e) => handleInputChange("fromCity", e.target.value)}
                          className={errors.fromCity ? "border-red-500" : ""}
                        />
                        {errors.fromCity && (
                          <p className="text-red-500 text-sm mt-1">{errors.fromCity}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="toCity">Куда лечу *</Label>
                        <Input
                          id="toCity"
                          placeholder="Город назначения"
                          value={formData.toCity}
                          onChange={(e) => handleInputChange("toCity", e.target.value)}
                          className={errors.toCity ? "border-red-500" : ""}
                        />
                        {errors.toCity && (
                          <p className="text-red-500 text-sm mt-1">{errors.toCity}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="departureDate">Дата вылета *</Label>
                        <Input
                          id="departureDate"
                          type="date"
                          value={formData.departureDate}
                          onChange={(e) => handleInputChange("departureDate", e.target.value)}
                          className={errors.departureDate ? "border-red-500" : ""}
                        />
                        {errors.departureDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="arrivalDate">Дата прилета</Label>
                        <Input
                          id="arrivalDate"
                          type="date"
                          value={formData.arrivalDate}
                          onChange={(e) => handleInputChange("arrivalDate", e.target.value)}
                          className={errors.arrivalDate ? "border-red-500" : ""}
                        />
                        {errors.arrivalDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.arrivalDate}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="airline">Авиакомпания</Label>
                        <Input
                          id="airline"
                          placeholder="Например: Аэрофлот"
                          value={formData.airline}
                          onChange={(e) => handleInputChange("airline", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="flightNumber">Номер рейса</Label>
                        <Input
                          id="flightNumber"
                          placeholder="Например: SU150"
                          value={formData.flightNumber}
                          onChange={(e) => handleInputChange("flightNumber", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="capacity">Могу взять, кг *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          step="0.5"
                          min="0.5"
                          max="20"
                          placeholder="5"
                          value={formData.capacity}
                          onChange={(e) => handleInputChange("capacity", e.target.value)}
                          className={errors.capacity ? "border-red-500" : ""}
                        />
                        {errors.capacity && (
                          <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="contactInfo">Контакты для связи</Label>
                        <Input
                          id="contactInfo"
                          placeholder="Telegram, WhatsApp, телефон"
                          value={formData.contactInfo}
                          onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="description">Описание и условия *</Label>
                        <Textarea
                          id="description"
                          placeholder="Расскажите о своем рейсе: цель поездки, что готовы взять, особые условия..."
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          className={errors.description ? "border-red-500" : ""}
                          rows={4}
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label>Ограничения</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                          {restrictionOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={option.id}
                                checked={formData.restrictions.includes(option.id)}
                                onCheckedChange={() => handleRestrictionToggle(option.id)}
                              />
                              <Label htmlFor={option.id} className="text-sm">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <Label>Предпочитаемые категории товаров</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                          {categoryOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={option.id}
                                checked={formData.preferredCategories.includes(option.id)}
                                onCheckedChange={() => handleCategoryToggle(option.id)}
                              />
                              <Label htmlFor={option.id} className="text-sm">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        {isSubmitting ? (
                          <>
                            <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                            Публикация рейса...
                          </>
                        ) : (
                          <>
                            <Icon name="Plane" size={16} className="mr-2" />
                            Опубликовать рейс
                          </>
                        )}
                      </Button>
                      <Link to="/traveler-dashboard">
                        <Button type="button" variant="outline">
                          Отменить
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Заработок</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {formData.capacity ? Math.round(parseFloat(formData.capacity) * 750).toLocaleString() : "0"}₽
                    </p>
                    <p className="text-sm text-gray-600">
                      Примерный доход за {formData.capacity || "0"} кг
                    </p>
                  </div>
                  
                  <Alert>
                    <Icon name="TrendingUp" size={16} />
                    <AlertDescription>
                      Средняя стоимость доставки: 500-1000₽ за кг
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Что это дает</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Icon name="DollarSign" size={16} className="text-green-500 mt-0.5" />
                    <span>Дополнительный доход с каждого рейса</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Heart" size={16} className="text-red-500 mt-0.5" />
                    <span>Помощь людям с доставкой</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Shield" size={16} className="text-blue-500 mt-0.5" />
                    <span>Безопасность через escrow-платежи</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Star" size={16} className="text-yellow-500 mt-0.5" />
                    <span>Повышение рейтинга попутчика</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Советы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Указывайте точные даты и время рейса</p>
                  <p>• Будьте честны в ограничениях</p>
                  <p>• Отвечайте быстро на сообщения</p>
                  <p>• Предоставляйте фото получения посылки</p>
                  <p>• Сообщайте о статусе доставки</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFlight;