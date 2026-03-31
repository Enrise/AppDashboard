FROM denoland/deno:2.7.9

USER deno

EXPOSE 8000

WORKDIR /opt/enrise/dashboard

COPY . /opt/enrise/dashboard

CMD ["run", "--allow-read", "--allow-net", "--allow-env", "main.ts"]
