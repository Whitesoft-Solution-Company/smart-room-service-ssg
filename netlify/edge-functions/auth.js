
export default async (request, context) => {
  const url = new URL(request.url);

  let token = url.searchParams.get("token");

  if (!token) {
    token = context.cookies.get("authToken"); // If no token in query, check cookies
    if (!token) {
      return Response.redirect("/401", 302);
    }
  }

  // Only set the token cookie if it's not already present
  if (!context.cookies.get("authToken")) {
    context.cookies.set({
        name: "authToken",
        value: token,
    });
  }

  // Verify token with Strapi
  const userRes = await fetch(`https://service.ananyalipe.com/api/hotels/${token}`);
  const userData = await userRes.json(); // Convert response to JSON
   
  // Check if token verification is valid
  if (!userRes.ok || userData.data === null) {
      context.cookies.set("authToken", "", { expires: new Date(0) }); // Clear the cookie
      return Response.redirect("/401", 302);
  }

  if (url.searchParams.get("token")) {
    return Response.redirect("/protected/home", 302); // Redirect to homepage with status 302
  }

  return context.next(); // Continue with the request
  };