export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // Get the current language
  const language = JSON.parse(localStorage.getItem("lang"));

  // Define options for date and time formatting
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Format date and time based on the current language
  const formattedDate = dateTime.toLocaleDateString(
    language === "ar" ? "ar-EG" : "en-GB",
    dateOptions
  );
  const formattedTime = dateTime.toLocaleTimeString(
    language === "ar" ? "ar-EG" : "en-GB",
    timeOptions
  );

  // Split time to adjust for period in Arabic if needed
  const [time, period] = formattedTime.split(" ");
  const formattedPeriod =
    period === "AM" && language === "ar"
      ? "ص"
      : period === "PM" && language === "ar"
      ? "م"
      : period.toLowerCase();

  // Rearrange time format if the language is Arabic
  const [hours, minutes] = time.split(":");
  const formattedTimeArabic =
    language === "ar" ? `${minutes}:${hours}` : `${hours}:${minutes}`;

  // Combine date and time with the period, adding a space between date and time
  const formattedDateTime =
    language === "ar"
      ? `${formattedTimeArabic} ${formattedPeriod}  -  ${formattedDate}`
      : `${formattedDate} - ${time} ${formattedPeriod}`;

  return formattedDateTime;
}
