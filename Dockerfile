FROM denoland/deno:latest AS base

WORKDIR /opt/enrise/dashboard

COPY . /opt/enrise/dashboard

EXPOSE 8000

CMD ["run", "-A", "main.ts"]
