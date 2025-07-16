import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

const CreateOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fromCity: "",
    toCity: "",
    weight: "",
    dimensions: "",
    reward: "",
    preferredDate: "",
    urgency: "normal",
    pickupAddress: "",
    deliveryAddress: "",
    contactInfo: "",
    specialInstructions: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Укажите название заказа";
    if (!formData.description.trim()) newErrors.description = "Добавьте описание";
    if (!formData.fromCity.trim()) newErrors.fromCity = "Укажите город отправления";
    if (!formData.toCity.trim()) newErrors.toCity = "Укажите город назначения";
    if (!formData.weight.trim()) newErrors.weight = "Укажите вес посылки";
    if (!formData.reward.trim()) newErrors.reward = "Укажите сумму вознаграждения";
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = "Укажите адрес получения";
    if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = "Укажите адрес доставки";

    const weight = parseFloat(formData.weight);
    if (isNaN(weight) || weight <= 0) newErrors.weight = "Вес должен быть положительным числом";
    if (weight > 10) newErrors.weight = "Максимальный вес: 10 кг";

    const reward = parseFloat(formData.reward);
    if (isNaN(reward) || reward <= 0) newErrors.reward = "Сумма должна быть положительной";
    if (reward < 500) newErrors.reward = "Минимальное вознаграждение: 500₽";

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
      console.log("Order created:", formData);
      setIsSubmitting(false);
      navigate("/customer-dashboard");
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const commission = formData.reward ? Math.round(parseFloat(formData.reward) * 0.25) : 0;
  const total = formData.reward ? parseFloat(formData.reward) + commission : 0;

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
            <Link to="/customer-dashboard">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад к заказам
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Создать заказ</h1>
            <p className="text-gray-600">
              Заполните форму ниже, чтобы найти попутчика для доставки вашей посылки
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Детали заказа</CardTitle>
                  <CardDescription>
                    Укажите подробную информацию о вашей посылке
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Название заказа *</Label>
                        <Input
                          id="title"
                          placeholder="Например: Тайские фрукты, Итальянские сувениры"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="description">Описание посылки *</Label>
                        <Textarea
                          id="description"
                          placeholder="Опишите что нужно доставить: тип товара, особенности, что купить и где..."
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          className={errors.description ? "border-red-500" : ""}
                          rows={4}
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="fromCity">Откуда *</Label>
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
                        <Label htmlFor="toCity">Куда *</Label>
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
                        <Label htmlFor="weight">Вес, кг *</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          min="0.1"
                          max="10"
                          placeholder="2.5"
                          value={formData.weight}
                          onChange={(e) => handleInputChange("weight", e.target.value)}
                          className={errors.weight ? "border-red-500" : ""}
                        />
                        {errors.weight && (
                          <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="dimensions">Размеры (ДxШxВ), см</Label>
                        <Input
                          id="dimensions"
                          placeholder="30x20x15"
                          value={formData.dimensions}
                          onChange={(e) => handleInputChange("dimensions", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="reward">Вознаграждение, ₽ *</Label>
                        <Input
                          id="reward"
                          type="number"
                          min="500"
                          placeholder="3000"
                          value={formData.reward}
                          onChange={(e) => handleInputChange("reward", e.target.value)}
                          className={errors.reward ? "border-red-500" : ""}
                        />
                        {errors.reward && (
                          <p className="text-red-500 text-sm mt-1">{errors.reward}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="preferredDate">Желаемая дата доставки</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="urgency">Срочность</Label>
                        <Select
                          value={formData.urgency}
                          onValueChange={(value) => handleInputChange("urgency", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Не срочно</SelectItem>
                            <SelectItem value="normal">Обычная</SelectItem>
                            <SelectItem value="high">Срочно</SelectItem>
                            <SelectItem value="urgent">Очень срочно</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="pickupAddress">Адрес получения посылки *</Label>
                        <Textarea
                          id="pickupAddress"
                          placeholder="Точный адрес, где попутчик должен забрать посылку или что купить и где"
                          value={formData.pickupAddress}
                          onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
                          className={errors.pickupAddress ? "border-red-500" : ""}
                          rows={3}
                        />
                        {errors.pickupAddress && (
                          <p className="text-red-500 text-sm mt-1">{errors.pickupAddress}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="deliveryAddress">Адрес доставки *</Label>
                        <Textarea
                          id="deliveryAddress"
                          placeholder="Куда и кому доставить посылку в городе назначения"
                          value={formData.deliveryAddress}
                          onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                          className={errors.deliveryAddress ? "border-red-500" : ""}
                          rows={3}
                        />
                        {errors.deliveryAddress && (
                          <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="contactInfo">Контактная информация</Label>
                        <Input
                          id="contactInfo"
                          placeholder="Телефон, telegram, email для связи"
                          value={formData.contactInfo}
                          onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="specialInstructions">Особые указания</Label>
                        <Textarea
                          id="specialInstructions"
                          placeholder="Дополнительные требования, инструкции по упаковке, хранению и т.д."
                          value={formData.specialInstructions}
                          onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                          rows={3}
                        />
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
                            Создание заказа...
                          </>
                        ) : (
                          <>
                            <Icon name="Send" size={16} className="mr-2" />
                            Создать заказ
                          </>
                        )}
                      </Button>
                      <Link to="/customer-dashboard">
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
                  <CardTitle>Расчет стоимости</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Вознаграждение попутчику:</span>
                    <span className="font-medium">
                      {formData.reward ? `${parseInt(formData.reward).toLocaleString()}₽` : "0₽"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Комиссия сервиса (25%):</span>
                    <span className="font-medium">{commission.toLocaleString()}₽</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого к оплате:</span>
                      <span className="text-primary">{total.toLocaleString()}₽</span>
                    </div>
                  </div>
                  <Alert>
                    <Icon name="Info" size={16} />
                    <AlertDescription>
                      Средства будут заморожены в escrow до выполнения заказа
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Как это работает</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                    <span>Вы создаете заказ и замораживаете средства в escrow</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                    <span>Попутчики подают заявки на выполнение заказа</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                    <span>Вы выбираете подходящего попутчика</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
                    <span>После доставки средства переводятся попутчику</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;